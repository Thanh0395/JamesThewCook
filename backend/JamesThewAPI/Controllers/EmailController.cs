using JamesThewAPI.ModelUtility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using System.Resources;
using JamesThewAPI.Repository;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly ProjectS3Context _dbContext;
        public EmailController(ProjectS3Context dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("forgotpassword")]
        public async Task<ActionResult<CustomRespone<User>>> ForgotPassword(MailConfig mailConfig)
        {
            try
            {
                var userDB = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email.Equals(mailConfig.ToMail));
                var newPass = "000";
                if (userDB == null)
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Email have not registed yet", null, null);
                    return NotFound(response);
                }
                else
                {
                    //password
                    userDB.Password = UserSecurity.EncodePlanTet(newPass);
                    _dbContext.Entry(userDB).State = EntityState.Modified;
                    await _dbContext.SaveChangesAsync();
                    //mail
                    var message = new MailMessage(FromMail.MailSend, mailConfig.ToMail);
                    message.Subject = "Change the password from James Thew website";
                    message.Body = $"Your new pass is: {newPass}. Change it quickly";
                    message.IsBodyHtml = true;

                    using (var clientMail = new SmtpClient())
                    {
                        clientMail.Host = "smtp.gmail.com";
                        clientMail.Port = 587;
                        //dat thanh false de chi ra rang chung ta muon su dung
                        //thong tin dang nhap cu the(ten dang nhap va mat khau)
                        clientMail.UseDefaultCredentials = false;
                        clientMail.EnableSsl = true;
                        clientMail.Credentials = new NetworkCredential(FromMail.MailSend, FromMail.PasswordMail);
                        clientMail.Send(message);
                    }

                    var response = new CustomRespone<User>
                                (StatusCodes.Status200OK, "View User", userDB, null);
                    return Ok(response);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
