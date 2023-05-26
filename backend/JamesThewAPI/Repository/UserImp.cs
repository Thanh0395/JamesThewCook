using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility;
using JamesThewAPI.ModelUtility.FIleService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Net.NetworkInformation;
using System.Security.Principal;

namespace JamesThewAPI.Repository
{
    public class UserImp : IUser
    {
        private readonly ProjectS3Context _dbContext;
        private readonly IFileUpload _formFile;
        private string componentPath = "/Images/User";
        public UserImp(ProjectS3Context dbContext, IFileUpload formFile)
        {
            _dbContext = dbContext;
            _formFile = formFile;
        }

        public async Task<User> AddUserAsync(User user, IFormFile file)
        {
            var userDB = _dbContext.Users.FirstOrDefault(u => u.Email.Equals(user.Email));
            user.Email = user.Email.ToLower();
            if (userDB == null)
            {
                //xu li File hinh
                if (file != null)
                {
                    var fileName = await _formFile.UploadFile(file, componentPath);
                    if (fileName != null)
                    {
                        user.Avatar = "/Public" + componentPath + "/" + fileName;
                    }
                    else
                    {
                        user.Avatar = "defaultImage";
                    }
                }
                else
                {
                    user.Avatar = "/Public" + componentPath + "/" + "defaultavt.png";
                }
                //xu li password
                user.Password = UserSecurity.EncodePlanTet(user.Password);
                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            else
            {
                return null;
            }
        }

        public async Task<User> ChangeUserPassAsync(string email, string oldPass, string newPass)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email.Equals(email));
            if (user != null )
            {
                if (UserSecurity.DecodePlanTet(user.Password).Equals(oldPass))
                {
                    user.Password = UserSecurity.EncodePlanTet(newPass);
                    _dbContext.Entry(user).State = EntityState.Modified;
                    await _dbContext.SaveChangesAsync();
                    return user;
                }
                else return null;
            }
            else return null;
        }

        //public async Task<User> CheckLogin(string email, string pass)
        //{
        //    var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email.Equals(email));
        //    if (user != null)
        //    {
        //        bool aPin = UserSecurity.DecodePlanTet(user.Password).Equals(pass);
        //        if (aPin)
        //        {
        //            return user;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}

        public async Task<bool> DeleteUserAsync(int UId)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UId.Equals(UId));
            if (user != null)
            {
                if (!string.IsNullOrEmpty(user.Avatar) && user.Avatar != "/Public/Images/User/defaultavt.png")
                {
                    bool resultDeleteFileExist = await _formFile.DeleteFile(user.Avatar, componentPath);
                    if (resultDeleteFileExist == true)
                    {
                        _dbContext.Users.Remove(user);
                        await _dbContext.SaveChangesAsync();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else return false;
        }

        public async Task<User> GetUserAsync(int UId)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UId.Equals(UId));
            if (user != null) return user;
            else return null;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> UpdateUserAsync(User user, IFormFile file)
        {
            var userDB = await _dbContext.Users.FindAsync(user.UId);
            if (userDB != null)
            {
                //xu li File hinh
                if (file != null)
                {
                    //xoa anh cu. ma khac vơi defaultImage
                    if (userDB.Avatar != null && userDB.Avatar != user.Avatar && userDB.Avatar != "/Public/Images/User/defaultavt.png")
                    {
                        await _formFile.DeleteFile(userDB.Avatar, componentPath);
                    }
                    var fileName = await _formFile.UploadFile(file, componentPath);
                    if (fileName != null)
                    {
                        user.Avatar = "/Public" + componentPath + "/" + fileName;
                    }
                    else
                    {
                        user.Avatar = userDB.Avatar;
                    }
                }
                else
                {
                    user.Avatar = userDB.Avatar;
                }
                //xu li password
                user.Email = user.Email.ToLower();
                user.Password = userDB.Password;
                _dbContext.Entry(user).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return user;
            }
            else  return null;
        }
    }
}
