
export async function getAllProducts(pb, { page, limit, filter }) {
  // En pocketbase se usa = (igual) != (diferente) ~ (contiene)
  const result = await pb.collection('mercadona_products').getList(page, limit, { filter })

  return result;
}

export async function getProductById(pb, id) {
  const result = await pb.collection('mercadona_products').getOne(id)

  return result
}


export async function getHistoricalData(pb, { id, start, end }) {

  if (!start || !end) {
    const result = await pb.collection('mercadona_prices').getFullList({
      filter: `producto_id = '${id}'`,
    })
    return result
  }

  const startISO = new Date(start).toISOString()
  const endISO = new Date(end + 'T23:59:59.999Z').toISOString()




  const result = await pb.collection('mercadona_prices').getFullList({
    filter: `producto_id = '${id}' && fecha_muestreo >= '${startISO}' && fecha_muestreo <= '${endISO}'`,
  })

  return result
}

export async function getAllStats(pb, { page, limit, filter, sort }) {
  // En pocketbase se usa = (igual) != (diferente) ~ (contiene)
  const result = await pb.collection('mercadona_stats').getList(page, limit, {
    filter, sort, expand: 'product_id' })

  return result;
}
