export default {

    generateRandomcolor(address){

        let sum0=0, sum1=0,
            sum2 = 0;
        for (let i=0; i<address.length; i++){

            if (i %3 === 0)
                sum0 = sum0 + address.charCodeAt(i);
            else
            if (i %3 === 1)
                sum1 = sum1 + address.charCodeAt(i);
            else
            if (i %3 === 2)
                sum2 = sum2 + address.charCodeAt(i);
        }

        return "rgb(" + sum0 % 256 + "," + sum1 % 256 + "," + sum2 % 256 + ")";
    },


}