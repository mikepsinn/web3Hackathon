import { NFTStorage, File } from 'nft.storage'

const apiKey = process.env.NFT_STORAGE_KEY
const client = new NFTStorage({ token: apiKey })

const metadata = await client.store({
    name: '',
    description: '',
    image: '',
})

console.log(metadata.url);