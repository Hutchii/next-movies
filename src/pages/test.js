export default function Index({ time }) {
  return (
    <main>
      <h1>SSR Caching with Next.js</h1>
      <h1 dateTime={time}>{time}</h1>
    </main>
  )
}

export async function getServerSideProps({ req, res }) {
  console.log(res)
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {
      time: new Date().toISOString(),
    },
  }
}