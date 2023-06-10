using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.FIleService;
using JamesThewAPI.ModelUtility.Rating;
using Microsoft.EntityFrameworkCore;
using System;

namespace JamesThewAPI.Repository
{
    public class SCImp : ISubmissionContest
    {
        private readonly ProjectS3Context context;
        private readonly IFileUpload interfaceFileUpload;
        private string componentPath = "/Images/SC";
        public SCImp(ProjectS3Context _context, IFileUpload _interfaceFileUpload)
        {
            context = _context;
            interfaceFileUpload = _interfaceFileUpload;
        }

        public async Task<SubmissionContest> AddSC(SubmissionContest sc, IFormFile file)
        {
            var scdb = await context.SubmissionContests.FirstOrDefaultAsync(p => p.UId.Equals(sc.UId) && p.ContestId.Equals(sc.ContestId));
            if (scdb == null)
            {
                if (sc != null)
                {
                    if (file != null)
                    {
                        var fileName = await interfaceFileUpload.UploadFile(file, componentPath);
                        if (fileName != null)
                        {
                            sc.Image = "/Public" + componentPath + "/" + fileName;
                        }
                        else
                        {
                            sc.Image = "defaultImage";
                        }
                    }
                    await context.SubmissionContests.AddAsync(sc);
                    await context.SaveChangesAsync();
                    return sc;
                    //await _dbContext.Recipes.AddAsync(recipe);
                    //await _dbContext.SaveChangesAsync();
                    //return recipe;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteSC(int id)
        {
            SubmissionContest sc = await context.SubmissionContests.FindAsync(id);
            if (sc != null)
            {
                context.SubmissionContests.Remove(sc);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<SubmissionContest>> GetAllSC()
        {
            return await context.SubmissionContests.ToListAsync();
        }

        public async Task<IEnumerable<TotalRatingModel>> GetAverageScore()
        {
            var scdb = await context.SubmissionContests.ToListAsync();
            var rating = await context.Ratings.ToListAsync();
            var data = from r in rating
                       group r by new { r.ScId } into g
                       select new TotalRatingModel
                       {
                           scId = (int) g.Key.ScId,
                           uIdCount = g.Count(),
                           avgScore = g.Sum(e => e.Score / g.Count()),
                       };
            foreach(var item in data)
            {
                var scdb2 = await context.SubmissionContests.FindAsync(item.scId);
                if(scdb2 != null)
                {
                    scdb2.AverageScore = item.avgScore;
                    context.Entry(scdb2).State = EntityState.Modified;
                    await context.SaveChangesAsync();
                }
            }
            return data;
        }
        public async Task<User> GetWinner(int contestID)
        {
            var scdb = await context.SubmissionContests.OrderByDescending(p => p.AverageScore).Where(p => p.ContestId.Equals(contestID)).FirstOrDefaultAsync();
            var contestdb = await context.Contests.FirstOrDefaultAsync(p => p.ContestId.Equals(contestID));
            if (scdb == null)
            {
                contestdb.EndDate = DateTime.Now;
                context.Entry(contestdb).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return null;
            }
            else
            {
                var userId = scdb.UId;
                contestdb.Winner = userId;
                contestdb.EndDate = DateTime.Now;
                context.Entry(contestdb).State = EntityState.Modified;
                await context.SaveChangesAsync();
                var winner = await context.Users.FirstOrDefaultAsync(p => p.UId.Equals(userId));
                return winner;
            }
        }

        public async Task<IEnumerable<SubmissionContest>> GetSCById(int id)
        {
            var sc = await context.SubmissionContests.Where(e => e.ContestId.Equals(id)).ToListAsync();
            return (sc != null) ? sc : null;
        }

        public async Task<IEnumerable<SubmissionContest>> GetSCByUId(int id)
        {
            var sc = await context.SubmissionContests.Where(e => e.UId.Equals(id)).ToListAsync();
            return (sc != null) ? sc : null;
        }

        public async Task<SubmissionContest> UpdateSC(SubmissionContest sc, IFormFile file)
        {
            var scdb = await context.SubmissionContests.FindAsync(sc.ScId);
            if (scdb != null)
            {
                if (file != null)
                {
                    var fileName = await interfaceFileUpload.UploadFile(file, componentPath);
                    if (!string.IsNullOrEmpty(scdb.Image))
                    {
                        bool resultDeleteFileExist = await interfaceFileUpload.DeleteFile(scdb.Image, componentPath);
                        if (resultDeleteFileExist == true)
                        {
                            if (fileName != null)
                            {
                                sc.Image = "/Public" + componentPath + "/" + fileName;
                                context.Entry(sc).State = EntityState.Modified;
                                await context.SaveChangesAsync();
                                return sc;
                            }
                            else
                            {
                                return null;
                            }
                        }
                        else
                        {
                            sc.Image = "/Public" + componentPath + "/" + fileName;
                            context.Entry(sc).State = EntityState.Modified;
                            await context.SaveChangesAsync();
                            return sc;
                        }
                    }
                    else
                    {
                        sc.Image = "/Public" + componentPath + "/" + fileName;
                        context.Entry(sc).State = EntityState.Modified;
                        await context.SaveChangesAsync();
                        return sc;
                    }
                }
                else
                {
                    context.Entry(sc).State = EntityState.Modified;
                    await context.SaveChangesAsync();
                    return sc;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
