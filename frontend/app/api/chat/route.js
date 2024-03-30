import axios from 'axios';

export const POST = async (req, res) => {
    const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method should be POST' });
    } else if (process.env.NODE_ENV !== "development") {
        if (!referer || referer !== process.env.APP_URL) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    else {
        try {
            const { body } = req;
            const url = 'https://api.openai.com/v1/chat/completions';
            const headers = {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            };

            const response = await axios.post(url, body, { headers: headers });

            return res.status(200).json(response.data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
}
