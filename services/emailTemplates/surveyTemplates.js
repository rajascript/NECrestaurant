const keys = require("../../Config/keys");
module.exports = survey => {
  return `<html>
            <body> 
            <div style="text-align: center;">
                <h3>ENTER SURVEY</h3>
                <p>please answer:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectClickUrl}/api/surveys/${
    survey.id
  }/yes">Yes</a>    
                    </div>            
                    <div>
                    <a href="${keys.redirectClickUrl}/api/surveys/${
    survey.id
  }/no">No</a>    
                    </div>           
                 </div>
            </body>
         </html>`;
};
