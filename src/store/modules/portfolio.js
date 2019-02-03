const state = {
    funds: 10000,
    stocks: []
};

const mutations = {
    'BUY_STOCK': (state, {stockId, quantity, stockPrice}) => {

        const record = state.stocks.find(stock => stock.id === stockId);

        const orderPrice = quantity * stockPrice;

        if(record) {

            if(orderPrice > state.funds){
                let newQuantity = Math.floor(state.funds / stockPrice);
                state.funds -= newQuantity * stockPrice;
                record.quantity += newQuantity;
            } else {
                record.quantity += quantity;
                state.funds -= orderPrice;
            }

        } else {

            if(orderPrice > state.funds) {
                let newQuantity = Math.floor(state.funds / stockPrice);
                state.funds -= newQuantity * stockPrice;
                state.stocks.push({
                    id: stockId,
                    quantity: newQuantity
                });
            } else {
                state.stocks.push({
                    id: stockId,
                    quantity: quantity
                });
                state.funds -= orderPrice;
            }
            
        }
        
    },
    'SELL_STOCK': (state, {stockId, quantity, stockPrice}) => {

        const record = state.stocks.find(stock => stock.id === stockId);

        if(record.quantity > quantity){
            record.quantity -= quantity;
            state.funds += stockPrice * quantity;
        } else {
            state.funds += stockPrice * record.quantity;
            state.stocks.splice(state.stocks.indexOf(record), 1); 
        }    
        
    },
    'SET_PORTFOLIO': (state, portfolio) => {
        state.funds = portfolio.funds;
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    }
};

const actions = {
    sellStock: ({commit}, order) => {
        commit('SELL_STOCK', order);
    }
};

const getters = {
    stockPortfolio: (state, getters) => {
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id == stock.id);
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
    },
    funds: (state) => {
        return state.funds;
    }
};


export default {
    state,
    mutations,
    actions,
    getters
}