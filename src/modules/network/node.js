import NodeClient from "./node-client"
import consts from "consts/consts"

class Node {

    constructor(){

        this.stats = {};

        if (typeof window === "undefined") return;

        this.client = new NodeClient(consts.serverApi);

        this.client.on("stats/subscribe/data", c =>{

            this.stats = {
                blocks: c.blocks,
                transactions: c.transactions,
                network: c.network,
                shards: c.shards,
            };

        });

        this.client.emit( "stats/subscribe");

    }

}

export  default new Node();