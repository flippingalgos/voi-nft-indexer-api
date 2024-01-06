# ARC74 based ARC72 NFT Indexer API
### Jan 2024 Voi Hackathon Team Project API Repository

**Team:**
- MG
- FlippingAlgos
- EasyTiger

See here for information for developers, contributors, and users of NFT Indexer API.

## Table of Contents
- [ARC74 based ARC72 NFT Indexer API](#arc74-based-arc72-nft-indexer-api)
    - [Jan 2024 Voi Hackathon Team Project API Repository](#jan-2024-voi-hackathon-team-project-api-repository)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Tech stack](#tech-stack)
  - [General flow](#general-flow)
  - [Endpoints](#endpoints)
  - [Authentication](#authentication)
  - [Examples](#examples)

## Introduction

This API interface complies to [ARC74](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0074.md) to enable efficient querying of [ARC72](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0072.md) NFT assets on AVM networks (TESTNET for now).
Adhering to [ARC74], [ARC73] and [ARC72] this ARC NFT Indexer implements a 3 layer architecture:
- Presenter API (this repo)
- [Indexing API](https://github.com/emg110/AVM-ARC-NFT-Indexer)
- [Scanner API](https://github.com/emg110/AVM-ARC-NFT-Scanner)

```mermaid
graph TD
    AlgodAPI[Algod API]
    Scanner --> AlgodAPI[Algod API]
    Scanner --> Indexing[Indexing Serverless API]
    Presenter --> Indexing[Indexing Serverless API]
    User --> Presenter[Presenter API]

    style AlgodAPI fill:#f9f,stroke:#000,stroke-width:2px
    style Scanner fill:#bbf,stroke:#000,stroke-width:2px
    style Indexing fill:#f9d,stroke:#000,stroke-width:2px
    style Presenter fill:#bfb,stroke:#000,stroke-width:2px
    style User fill:#fdb,stroke:#000,stroke-width:2px
  ```
  Each entity in this chart plays a specific role in the system, forming a structured flow of operations from data retrieval to user interaction and delivery.

- Algod API: The starting point of the data flow, providing round based blocks and events data.
- Scanner NodeJS Module: Processes data from Algod API, scanning for ARC72 contracts.
- Indexing Serverless API: Receives and indexes data from the Scanner.
- Presenter API: Retrieves indexed data and prepares it for user interaction.
- User: The end-user who interacts with the system through the Presenter API ([ARC74]).

## Tech stack

- Vercel: Infrastructure used for NextJs based presenter API application (OA3 based)
- Cloudflare: Infrastructure used for Indexing API
- Cloudflare D1: SQL storage (SQLite API) 
- Cloudflare KV: KeyValue storage for internal parameters!
- NodeJS: Platform for Scanner module
- PM2: Reliable running agent for NodeJS. Used to reliably running Scanner module!

Note : Algorand or VOI node REST API needs to be available too! No AVM indexer API is needed!
## General flow

```mermaid
flowchart LR
    AlgodAPI[Algod API]
    Scanner[Scanner NodeJS Module]
    Indexing[Indexing Serverless API]
    Presenter[Presenter API]
    User[User]
    CloudflareD1[Cloudflare D1 SQL Instance]

    Scanner -->|Scans rounds & events| AlgodAPI
    Scanner -->|Calls POST methods with batch payload| Indexing
    Indexing -->|Writes data to| CloudflareD1
    CloudflareD1 -->|Reads data from| Indexing
    Presenter -->|Calls GET methods| Indexing
    User -->|Calls ARC74 GET methods| Presenter

    style AlgodAPI fill:#f9f,stroke:#000,stroke-width:2px
    style Scanner fill:#bbf,stroke:#000,stroke-width:2px
    style Indexing fill:#fbf,stroke:#000,stroke-width:2px
    style Presenter fill:#bfb,stroke:#000,stroke-width:2px
    style User fill:#fbb,stroke:#000,stroke-width:2px
    style CloudflareD1 fill:#ff9,stroke:#000,stroke-width:2px
  ```
## Endpoints

Documentation of available API endpoints, their functionality, and the expected request and response formats.

- `/endpoint1`: [Description]
- `/endpoint2`: [Description]
- ...

## Authentication

TBD.

## Examples

Provide examples of how to use the API, including sample requests and responses.

```bash

# Example request
curl -X GET "https://api.example.com/endpoint1" -H "Authorization: Bearer YOUR_ACCESS_TOKEN"


```
```json
# Example response
{
  "status": "success",
  "data": {
    // Your response data
  },
}
```