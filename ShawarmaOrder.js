const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOME:   Symbol("welcome to Richard's Sharwarma"),
  SIZE:   Symbol("size"),
  TOPPINGS:   Symbol("toppings"),
   
  RICEBOWL: Symbol("ricebowl"),
  SIZE: Symbol("bowlsize"),
  TOPPINGS2: Symbol("toppings2"),

  falafal: Symbol("falafal"), 
  IfalafalSIZE: Symbol("isize"),
  TOPPINGS3: Symbol("toppings3"),


  DRINKS: Symbol("drinks"),



  PAYMENT: Symbol("payment")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOME;
        this.stateCur = OrderState.WELCOME;
        this.sSize = "";
        this.sToppings = "";
        this.sItem1 = "shawarama";
        this.sItem2 = "ricebowl";
        this.sItem3 = "falafal";
        this.sriceSize = "";
        this.sriceToppings = "";
        this.sStuffedrice = "";
        this.sfalafalSIZE = "";
        this.sfalafalToppings = "";
        this.sDrinks = "";
        this.scost = 2;
        this.sTax = 0;
        this.sBillWithTax = 0;

    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOME:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Richard's Shawarma.");
                aReturn.push("What size Shawarma would you like?");
                break;

            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.RICEBOWL
                this.sToppings = sInput;
                aReturn.push("would you like ricebowl?");
                break;



                case OrderState.RICEBOWL:
                  if (sInput.toLowerCase() != "no") 
                  {
                      this.sItem2 = "ricebowl";
                      this.scost = this.scost + 7;
                      this.stateCur = OrderState.riceSIZE;
                      aReturn.push("what ricebowl size would you like??")
                  }
                 else
                  {
                    this.stateCur = OrderState.falafal
                    this.sItem3 = sInput;
                    aReturn.push("Would you like falafal?");
                  }

                  break;


              case OrderState.riceSIZE:
                
                if (sInput.toLowerCase() === "small" ||sInput.toLowerCase() === "large"|| sInput.toLowerCase() === "medium") 
                {
                  this.stateCur = OrderState.TOPPINGS2
                  this.sriceSize = sInput;
                  aReturn.push("What toppings would you like?");
                 
                }
                else
                {
                  aReturn.push("Please select the size between :- small/large/medium");
                }
                  break;


        
              case OrderState.TOPPINGS2:
                if(sInput.toLowerCase()=== "southwest" || sInput.toLowerCase()=== "mustard" || sInput.toLowerCase()=== "redhot"  )
                  {
                  this.stateCur = OrderState.falafal
                  this.sriceToppings = sInput;
                  aReturn.push("Would you like falafal?");
                  
                  }
                  else
                  {
                    aReturn.push("Please select the Toppings from below options :- southwest/mustard/redhot");
                  }

                  break;
        

        
              case OrderState.falafal:
                  if (sInput.toLowerCase() != "no") 
                  {
                      this.scost = this.scost + 7;
                      this.stateCur = OrderState.IfalafalSIZE;
                      aReturn.push("What size of falafal would you like?");
                    
                  }
                  else{
                  this.stateCur = OrderState.DRINKS
                  this.sDrinks = sInput;
                  aReturn.push("would you like drink with that?");
                  }
                  break;
        


              case OrderState.IfalafalSIZE:
                if (sInput.toLowerCase() === "small" ||sInput.toLowerCase() === "large"|| sInput.toLowerCase() === "medium"  ) 
                {
                  this.stateCur = OrderState.TOPPINGS3
                  this.sfalafalSIZE = sInput;
                  aReturn.push("which type of toppings in the falafal would you like?");
                }
                else
                {
                  aReturn.push("Please select the size between :- small/large/medium");
                }
                  break;


        
                  case OrderState.TOPPINGS3:
                    if(sInput.toLowerCase()=== "southwest" || sInput.toLowerCase()=== "mustard" || sInput.toLowerCase()=== "redhot"  )
                    {
                  this.stateCur = OrderState.DRINKS
                  this.sfalafalToppings = sInput;
                  aReturn.push("would you like drink with that?");
                    }
                    else
                    {
                      aReturn.push("Please select the Toppings from below options :- southwest/mustard/redhot");
                    }

                  break;
                  


            case OrderState.DRINKS:
                this.stateCur = OrderState.PAYMENT;
                this.sTax = this.scost*0.13;
                this.sBillWithTax = this.sTax+this.scost;
                this.nOrder = this.sBillWithTax;
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem1} with ${this.sToppings}`);
                this.sItem2 && aReturn.push(`${this.sriceSize } ${this.sItem2} with ${this.sriceToppings}`);
                this.sItem3 && aReturn.push(`${this.sfalafalSIZE} ${this.sItem3} with ${this.sfalafalToppings}`);
                aReturn.push(`total amount is ${this.scost}$`);
                aReturn.push(`total tax is ${this.sTax}$`);
                aReturn.push(`Final Bill is ${this.sBillWithTax}$`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                aReturn.push(`Please pay for your order here`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                break;

                case OrderState.PAYMENT:
                  var add = sInput.purchase_units[0]["shipping"];  
                  var add2 = add["address"];
                   this.isDone(true);
                    let d = new Date();
                     d.setMinutes(d.getMinutes() + 20);
                     aReturn.push(`Your order will be delivered at Address: ${add2["address_line_1"]}\n${add2["admin_area_2"]}\n${add2["admin_area_1"]}\n${add2["postal_code"]}\n${add2["country_code"]} \n at ${d.toTimeString()}`);
                      break;
        }
        return aReturn;
    }
    renderForm(sTitle = "-1", sAmount = "-1"){
      // your client id should be kept private
      if(sTitle != "-1"){
        this.sItem = sTitle;
      }
      if(sAmount != "-1"){
        this.nOrder = sAmount;
      }
      const sClientID =  process.env.SB_CLIENT_ID || 'put your client id here for testing ... Make sure that you delete it before committing'
      return(`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem} order of $${this.nOrder}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.nOrder}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);
  
    }
}