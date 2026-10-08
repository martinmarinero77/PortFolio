// Corre en los servidores de Vercel (Node), NUNCA en el navegador.
// Por eso acá process.env sí puede leer la key de forma segura.
export async function POST(request) {
    const body = await request.json();

    const upstream = await fetch(`${process.env.LLM_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.LLM_API_KEY}`,
        },
        body: JSON.stringify(body),
    });

    // Reenviamos la respuesta tal cual (incluido el streaming)
    return new Response(upstream.body, {
        status: upstream.status,
        headers: {
            'Content-Type': upstream.headers.get('content-type') || 'application/json',
        },
    });
}
