const counts = new Map<string, number>()

function seed(slug: string): number {
  const n = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return 40 + (n % 180)
}

export async function POST(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  const current = counts.has(slug) ? counts.get(slug)! : seed(slug)
  const next = current + 1
  counts.set(slug, next)
  return Response.json({ views: next })
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  const count = counts.has(slug) ? counts.get(slug)! : seed(slug)
  return Response.json({ views: count })
}
