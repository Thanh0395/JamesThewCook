using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.FIleService;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace JamesThewAPI.Repository
{
    public class ContestImp : IContest
    {
        private readonly ProjectS3Context context;
        private readonly IFileUpload interfaceFileUpload;
        private string componentPath = "/Images/Contest";
        public ContestImp(ProjectS3Context _context, IFileUpload _interfaceFileUpload)
        {
            context = _context;
            interfaceFileUpload = _interfaceFileUpload;

        }

        public async Task<Contest> AddContest(Contest contest, IFormFile file)
        {
            if (contest != null)
            {
                if (file != null)
                {
                    var fileName = await interfaceFileUpload.UploadFile(file, componentPath);
                    if (fileName != null)
                    {
                        contest.FeatureImage = "/Public" + componentPath + "/" + fileName;
                    }
                    else
                    {
                        contest.FeatureImage = "defaultImage";
                    }
                }
                await context.Contests.AddAsync(contest);
                await context.SaveChangesAsync();
                return contest;
                //await _dbContext.Recipes.AddAsync(recipe);
                //await _dbContext.SaveChangesAsync();
                //return recipe;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteContest(int id)
        {
            Contest contest = await context.Contests.FindAsync(id);
            if (contest != null)
            {
                context.Contests.Remove(contest);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<Contest>> GetAllContest()
        {
            return await context.Contests.ToListAsync();
        }

        public async Task<Contest> GetContestById(int id)
        {
            var contest = await context.Contests.FindAsync(id);
            return (contest != null) ? contest : null;
        }

        public async Task<Contest> UpdateContest(Contest contest, IFormFile file)
        {
            var contestdb = await context.Contests.FindAsync(contest.ContestId);
            if (contestdb != null)
            {
                if (file != null)
                {
                    var fileName = await interfaceFileUpload.UploadFile(file, componentPath);
                    if (!string.IsNullOrEmpty(contestdb.FeatureImage))
                    {
                        bool resultDeleteFileExist = await interfaceFileUpload.DeleteFile(contestdb.FeatureImage, componentPath);
                        if (resultDeleteFileExist == true)
                        {
                            if (fileName != null)
                            {
                                contest.FeatureImage = "/Public" + componentPath + "/" + fileName;
                                context.Entry(contest).State = EntityState.Modified;
                                await context.SaveChangesAsync();
                                return contest;
                            }
                            else
                            {
                                return null;
                            }
                        }
                        else
                        {
                            contest.FeatureImage = "/Public" + componentPath + "/" + fileName;
                            context.Entry(contest).State = EntityState.Modified;
                            await context.SaveChangesAsync();
                            return contest;
                        }
                    }
                    else
                    {
                        contest.FeatureImage = "/Public" + componentPath + "/" + fileName;
                        context.Entry(contest).State = EntityState.Modified;
                        await context.SaveChangesAsync();
                        return contest;
                    }
                }
                else
                {
                    context.Entry(contest).State = EntityState.Modified;
                    await context.SaveChangesAsync();
                    return contest;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
