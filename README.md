# \_MEX_TRIX

### Track [Bitmex](https://www.bitmex.com/register/dlOCfE) whale activity and liquidations in real time.

> "The whales do not sing because they have an answer, they sing because they have a song."
> -Gregory Colbert

What can we learn from watching whales? **\_MEX_TRIX** provides a visualization of **[Bitmex](https://www.bitmex.com/register/dlOCfE)** Orderbook data in real time as well as notifications for trades greater than **_100,000 contracts_** and liquidations.

_What does it all mean?_

That is for you to decide.

<img src="./public/Screen Shot 2020-03-16 at 2.32.07 AM.png">

## Setup

Follow the steps below to clone and install this repository locally.

* Run the following commands in your terminal:

```
//Clone the Repo//
git clone https://github.com/mczernyk/Stackathon.git

//Install the NPM Package//
npm install

//Run locally//
npm run start-dev
```

That's it! View **\_MEX_TRIX** locally on [localhost 8080](http://localhost:8080/)

Check out the latest deployment [here](https://stackathon-mc.herokuapp.com/)

## Background

This project was built as a submission for **_[Fullstack Academy's](https://www.fullstackacademy.com/)_** **Stackathon**, where students have 4 days to build an application from scratch. My goal was to learn more about utilizing and visualizing real-time external API data.

As a Bitcoin trader, I've always been interested in observing the correlation between large trades, liquidations, and price moves. In the past, I relied on several separate twitter bots to provide alerts for these events. I'd have to switch between my Orderbook feed and this stream of data to try to piece together an explanation for market moves, which was a less than perfect system in real time.

Eventually, I hope to build out this platform in several ways:

**_Added functionality:_**

* display this liquidation and whale data in a real-time, interactive bubble chart.

* provide live snapshots of buy and sell side Orderbook liquidity for all resting orders; display in a simple chart to indicate current market sentiment.

* Add alerts (audio, notifications).

**_Future Content:_**

* Add educational information re: Bitmex trading basics including contract structure, functionality & tools (leverage types, order types, stop losses), basic technical analysis techniques, and strategy fundamentals.

* Expand metrics to other exchanges (_Deribit, Bybit, Bitfinex, Binance_) and altcoins.
