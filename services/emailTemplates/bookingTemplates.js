module.exports = (username, bookingId, date, slot, status) => `<html>
            <body> 
            <div style="margin-left: 20px;">
                <h2>Your booking at Indique.</h2>
                <p>Hello! ${username}, Your order ${bookingId} for ${date},${slot}hrs, has been ${status}.</p>
                    <h2>Didn’t request this email?</h2>
                    <p>Please contact hi@indique.com to fix this issue</p>                            
                 </div>
            </body>
         </html>`;
