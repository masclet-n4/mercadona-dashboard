
export async function getAllProducts(pb, { page, limit, filter }) {
  // En pocketbase se usa = (igual) != (diferente) ~ (contiene)
  console.log(page,limit,filter)
  const result = await pb.collection('mercadona_products').getList(page, limit, { filter })

  return result;
}

export async function getHistoricalData(pb, { id, start, end }) {
  const startISO = new Date(start).toISOString()
  const endISO = new Date(end).toISOString()

  const result = await pb.collection('mercadona_prices').getFullList({
    filter: `id = '${id}' && date >= '${startISO}' && date <= '${endISO}'`,
  })

  return result
}
