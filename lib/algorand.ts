/* eslint-disable no-console */
import {platform_settings as ps} from './platform-conf'
import algosdk, {LogicSigAccount} from 'algosdk' 

export const dummy_addr = "b64(YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWE=)"
export const dummy_id = "b64(AAAAAAAAAHs=)"

let client = undefined;
export function getAlgodClient(){
    if(client===undefined){
        const {token, server, port} = ps.algod
        client = new algosdk.Algodv2(token, server, port)
    }
    return client
}

let indexer = undefined;
export function getIndexer() {
    if(indexer===undefined){
        const {token, server, port} = ps.indexer
        indexer = new algosdk.Indexer(token, server, port)
        //indexer = new algosdk.Indexer({ 'X-API-key' : token}, server, port)
    }
    return indexer
}

export function existsInArray(arr, search) {
    return arr.some(row => row.includes(search));
}

export async function getLogicFromTransaction(addr: string): Promise<LogicSigAccount> {
    const indexer = getIndexer()
    const txns = await indexer.searchForTransactions()
        .address(addr).do()

    for(let tidx in txns.transactions){
        const txn = txns.transactions[tidx]
        if(txn.sender == addr){
            const program_bytes = new Uint8Array(Buffer.from(txn.signature.logicsig.logic, "base64"));
            return new LogicSigAccount(program_bytes);
        }
    }
    return undefined
}

export async function isOptedIntoAsset(address: string, idx: number): Promise<boolean> {
    const indexer  = getIndexer()
    const result = await indexer.lookupAccountByID(address).do()
    const optedIn = result.account['assets'].find((r)=>{ return r['asset-id'] == idx })
    return optedIn !== undefined 
}


export async function getAssetByID(asset_id: number): Promise<any> {
    
    const indexer  = getIndexer()
    //const lookupAssetByID = await indexer.lookupAssetByID(asset_id).do()
    const lookupAssetByID = await indexer.lookupAssetByID(asset_id).do().then((data) => {
        return data
    }).catch((err)=>{ 
        //console.log("error", err)
        return undefined
    })

    return await lookupAssetByID.asset

}

export async function getSuggested(rounds){
    const client = getAlgodClient();
    const txParams = await client.getTransactionParams().do();
    return { ...txParams, lastRound: txParams['firstRound'] + rounds }
}


export function uintToB64(x: number): string {
    return Buffer.from(algosdk.encodeUint64(x)).toString('base64')
}

export function addrToB64(addr: string): string {
    if (addr == "" ){
        return dummy_addr
    }
    try {
        const dec = algosdk.decodeAddress(addr)
        return "b64("+Buffer.from(dec.publicKey).toString('base64')+")"
    }catch(err){
        return dummy_addr
    }
}
export function b64ToAddr(x){
    return algosdk.encodeAddress(new Uint8Array(Buffer.from(x, "base64")));
}

export async function sendWait(signed: any[]):Promise<string> {
    const client = getAlgodClient()

    if(ps.dev.debug_txns) download_txns("grouped.txns", signed.map((t)=>{return t.blob}))

    try {
        const {txId} = await client.sendRawTransaction(signed.map((t)=>{return t.blob})).do()
        const result = await waitForConfirmation(client, txId, 3)
        if(result) {
            //showNetworkSuccess(txId)
            return txId
        }  

    } catch (error) { 
        //showNetworkError("Test", error) 
    }

    return undefined 
}


export async function getTransaction(txid: string) {
    return await waitForConfirmation(getAlgodClient(), txid, 3)
}

export async function waitForConfirmation(algodclient, txId, timeout) {
    if (algodclient == null || txId == null || timeout < 0) {
      throw new Error('Bad arguments.');
    }

    const status = await algodclient.status().do();
    if (typeof status === 'undefined')
      throw new Error('Unable to get node status');

    const startround = status['last-round'] + 1;
    let currentround = startround;
  
    /* eslint-disable no-await-in-loop */
    while (currentround < startround + timeout) {
      const pending = await algodclient
        .pendingTransactionInformation(txId)
        .do();

      if (pending !== undefined) {
        if ( pending['confirmed-round'] !== null && pending['confirmed-round'] > 0) 
          return pending;
  
        if ( pending['pool-error'] != null && pending['pool-error'].length > 0) 
          throw new Error( `Transaction Rejected pool error${pending['pool-error']}`);
      }

      await algodclient.statusAfterBlock(currentround).do();
      currentround += 1;
    }

    /* eslint-enable no-await-in-loop */
    throw new Error(`Transaction not confirmed after ${timeout} rounds!`);
}

export function download_txns(name, txns) {
    let b = new Uint8Array(0);
    for(const txn in txns){
        b = concatTypedArrays(b, txns[txn])
    }
    var blob = new Blob([b], {type: "application/octet-stream"});

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
}

export function concatTypedArrays(a, b) { // a, b TypedArray of same type
    var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}