using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ProjectS3Context _dbContext;
        private readonly IConfiguration _configuration;
        //asdfg
        public AuthController(ProjectS3Context dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(new { token });
            }
            return NotFound();
        }
        //To validate user
        private User Authenticate(UserLogin userLogin)
        {
            var listUser = _dbContext.Users.ToList();
            if (listUser != null)
            {
                var currentUser = listUser.FirstOrDefault(u => u.Email.ToLower() == userLogin.Email
                && UserSecurity.DecodePlanTet(u.Password).Equals(userLogin.Password) );
                return currentUser;
            }
            return null;
        }
        //To generate token
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials
                (securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("UserName",user.UserName),
                new Claim("Email",user.Email),
                new Claim(ClaimTypes.Role,user.Role)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
