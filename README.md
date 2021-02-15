# Discord Payment Bot JS

> This bot is a discord bot for PayPal payments.

## 🛠️ Requirements

1. Discord Bot Token **[Click Here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. PayPal Business Account **[Click Here](https://www.paypal.com/us/webapps/mpp/referral/paypal-business-account)**  
    2.1 Create an application **[Click Here](https://developer.paypal.com/docs/api-basics/manage-apps/#:~:text=You%20can%20create%20or%20edit,the%20REST%20API%20apps%20section.)**
3. Node.js v14.0.0 or newer **[Click Here](https://nodejs.org/en/download)**
 
## 🚀 Getting Started

```
git clone https://github.com/DarklessV/Discord-Payment-Bot-JS.git
cd Discord-Payment-Bot-JS
npm init
npm i discord.js paypal-rest-sdk fs
```

## ⚙️ Configuration

⚠️ **Note: Never share your token** ⚠️

```json
{
  "paypal": {
    "mode": "CHANGE ME",
    "appID": "CHANGE ME",
    "secretKey": "CHANGE ME",
    "currency": "CHANGE ME",
    "businessName": "CHANGE ME",
    "terms": "CHANGE ME",
    "billCheck": 30
  },
  "embed": {
    "errorColor": "#e50113",
    "pendingColor": "#ff8d00",
    "successColor": "#1bf207",
    "errImg": "https://i.imgur.com/uS57EFF.png"
  },
  "Bot": {
    "prefix": "CHANGE ME",
    "authorizedRole": "CHANGE ME",
    "token": "CHANGE ME"
  }
}
```

```
Mode: This can be set to either sandbox or live. Sandbox is used for testing the app and live is used for actual payments.
appID: Your PayPal client ID from the Application Settings.
secretKey: Your PayPal Application secret from the Application Settings.
currency: Your money currency.
businessName: Your bisiness Name.
terms: The terms of services that you have.
billCheck: The default is 30 seconds, this is required for the bot to examine each time period if the payment is successfully paid.

errorColor: You can replace it with any color you want, check the colors here: https://www.color-hex.com
pendingColor:  ^^ ^^
successColor:  ^^ ^^
errImg:   You can replace it with any image you want.


prefix: The prefix that the bot you want to listen.
authorizedRole: The role id which can access the comman.
token: The bot token.
```

## 📝 Command
* **Pay:** `!pay (amount of money) (product title) (billing description)`