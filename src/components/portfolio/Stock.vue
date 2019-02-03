<template>
    <div class="col-sm-4 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: ${{ stock.price }} | Quantity: {{ stock.quantity }})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" 
                        class="form-control"
                        placeholder="Quantity"
                        v-model="quantity">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success" @click="sellStocks"
                    :disabled="quantity <= 0 || !Number.isInteger(parseInt(quantity, 10)) || quantity % 1 != 0 ">Sell</button>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script>
    import {mapActions} from 'vuex';
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    methods: {
            ...mapActions({
                placeSellOrder: 'sellStock'
            }),
        sellStocks(){
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            };
            this.placeSellOrder(order);
            this.quantity = 0;
        }
    }
}
</script>


<style scoped>

</style>

