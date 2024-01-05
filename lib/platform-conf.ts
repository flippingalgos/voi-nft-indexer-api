import { addrToB64 } from './algorand'

type AlgodConf = {
    server: string
    port: number
    token: string
    network: string
};
type IndexerConf = {
    server: string
    port: number
    token: string
};
type IpfsConf = {
    display: string
    ipfsGateway: string
    token: string
};
type AppConf = {
    owner_addr: string  // Address of owner
    owner_addr2: string  // Address of owner
    admin_addr: string  // Address of app creator 
    name: string        // Name of the App 
};

type DevConf = {
    debug_txns: boolean
    accounts: {
        [key: string]: string[]
    }
};

type PlatformConf = {
    domain: string
    algod: AlgodConf
    ipfs: IpfsConf
    indexer: IndexerConf
    explorer: string
    application: AppConf
    dev: DevConf
};

const platform_settings = require("../config.json") as PlatformConf;

function get_template_vars(override: any): any {
    return {
        "TMPL_ADMIN_ADDR": addrToB64(platform_settings.application.admin_addr),
        "TMPL_OWNER_ADDR": addrToB64(platform_settings.application.owner_addr),
        ...override
    }
}


//@ts-ignore
export { platform_settings, AppConf, get_template_vars }