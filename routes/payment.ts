import { Router,Request,Response } from "express";
import 'dotenv/config'
import cors from "cors"
import Stripe from "stripe";
export const app = Router()

const stripe = new Stripe(process.env.STRIPE_KEY||'',{
    apiVersion:'2022-11-15',
    typescript:true
})

type itemType = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity:number
};
app.get('/test', async (req:Request, res:Response) => {

  res.send('test')
});

app.post('/create-checkout-session', async (req:Request, res:Response) => {
const line_items = req.body.checkoutItems.map((item:itemType) => 
{ return {
  price_data: {
    currency: 'inr',
    product_data: {
      name: item.name,
    },
    unit_amount: Math.round(item.price*100),
  },
  quantity: 1,
}
})
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    console.log(session)
  res.send({url:session.url})
  });