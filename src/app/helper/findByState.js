const findByState = (state, array)=>{
    console.log(state)
    if(state == 'all') {
        return array
    }
    else if( state=='done'){
        return array.filter(order=>order.state == 'DONE')
    }
    else if( state =='cancelled'){
        console.log(1)
        console.log(array.filter(order=>order.state == 'CANCELED'))
        return array.filter(order=>order.state == 'CANCELED')
       
    }
   
}
export default findByState