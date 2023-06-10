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
            mailConfig.Subject = "Change the password from James Thew website";
            mailConfig.Body = $"Change it quickly! <button type='button' ><a href='http://localhost:3000/user/reset-password?ToMail={mailConfig.ToMail}'>Change</a></button> ";
            try
            {
                var userDB = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email.Equals(mailConfig.ToMail));
                if (userDB == null)
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Email have not registed yet", null, null);
                    return NotFound(response);
                }
                else
                {
                    //send email
                    SendEmail(mailConfig);

                    var response = new CustomRespone<User>
                                (StatusCodes.Status200OK, "The link to reset your password sent via your email. Please check", userDB, null);
                    return Ok(response);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("sendfeedback")]
        public async Task<ActionResult<CustomRespone<User>>> SendFeedback(MailConfig mailConfig)
        {
            mailConfig.Subject = "Thanks for your contribution to James Thew website";
            mailConfig.Body = "Your contribution is our driving force to develop and make you more satisfied. Your feedback is:\n" +
                mailConfig.Body +
                "\nHave a nice day";
            try
            {
                var userDB = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email.Equals(mailConfig.ToMail));
                if (userDB == null)
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Email have not registed yet", null, null);
                    return NotFound(response);
                }
                else
                {
                    //send email
                    SendEmail(mailConfig);

                    var response = new CustomRespone<User>
                                (StatusCodes.Status200OK, "Thank for your feedback", userDB, null);
                    return Ok(response);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("resetpassword")]
        public async Task<ActionResult<CustomRespone<User>>> ResetPassword(string email, string newPass)
        {
            try
            {
                var userDB = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
                if (userDB != null)
                {
                    //password
                    userDB.Password = UserSecurity.EncodePlanTet(newPass);
                    _dbContext.Entry(userDB).State = EntityState.Modified;
                    await _dbContext.SaveChangesAsync();
                    var response = new CustomRespone<User>
                                (StatusCodes.Status200OK, "Your password have been change", userDB, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Email have not registed yet", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        private static void SendEmail (MailConfig mailConfig)
        {
            //mail
            var message = new MailMessage(FromMail.MailSend, mailConfig.ToMail);
            message.Subject = mailConfig.Subject;
            message.Body = mailConfig.Body;
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
        }
    }
}
