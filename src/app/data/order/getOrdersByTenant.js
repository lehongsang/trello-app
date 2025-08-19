
export default async function getOrdersByTenant(tenant_id) {
    if (tenant_id) {
        let url = `http://localhost:8080/orders/tenant/${tenant_id}`
        try {
            const data = await ((await fetch(url, { cache: 'no-store' })).json())
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}