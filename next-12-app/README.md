# Intro
This is a simple Next.js application set up with typescript, eslint and prettier. 
The applications show examples of creating pages with routes, some important features of Nextjs, and 
crypto api to fetch current prices and info for each crypto. This is built mainly to teach users how 
to start using Next.js.

Production Link:  https://next12-app-3phy6n17g-jasonouyang80.vercel.app/  (located in another github repo to show deployment)
# To Start
Run "yarn" to Download Dependencies 
# Starting Server
Run "yarn dev"
# Running Lint for Formatted Text
Run "yarn lint"
# Make sure to use proxy server to use api
Go to this [Link](https://cors-anywhere.herokuapp.com/corsdemo) and request access

## Environment Variables
An .env.local file needs to be setup 
Inside, it must contain these two links:
NEXT_PUBLIC_API_KEY=coinranking9720426bb55994bb22fc2c318f3098549abe67935ea697e5
NEXT_PUBLIC_API_URL=https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2
