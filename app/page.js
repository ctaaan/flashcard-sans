'use client'
import Image from 'next/image'
import Head from 'next/head'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { AppBar, Typography, Container, Toolbar, Button, Box, Grid } from "@mui/material"
import { useRouter } from 'next/navigation'



export default function Home() {
  const router = useRouter()

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST', 
        headers: {
          origin: 'https://localhost:3000'
        },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout ({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <Container maxWidth='100vw'>
      <Head>
        <title>Flashcared Saas</title>
        <meta name="description" content="Create a flashcard from your text"/>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard Saas
            </Typography>
          <SignedOut>
            <Button color="inherit" href="sign-in">
              {' '}
              Login
              </Button>
            <Button color="inherit" href="sign-up">
              {' '}
            Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: 'center',
          my: 4,
        }}
        >
          <Typography variant="h2" gutterBottom>Welcome to Flashcard Saas!</Typography>
          <Typography variant="h5" gutterBottom>
            {' '}
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => router.push('/generate')}>
          Get Started
          </Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards have never been easier.
              </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise flashcards perfect for studying.
              </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography> 
              {' '}
              Access your flashcards from any device, at any time. Perfect for on the go.
              </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4">Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1 px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>5 USD / Month</Typography>
              <Typography gutterBottom>
               {' '}
                Access to basic flashcard features and linited storage.
                </Typography>
                <Button variant = "contained" color= "primary">Choose Basic</Button>
              </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1 px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>10 USD / Month</Typography>
              <Typography gutterBottom>
               {' '}
                Unlimited flashcard features and unlimited storage.
                </Typography>
                <Button variant = "contained" color= "primary" onClick={handleSubmit}>Choose Pro</Button>
              </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
