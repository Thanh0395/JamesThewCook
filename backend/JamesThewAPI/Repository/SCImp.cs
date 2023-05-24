using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.FIleService;
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
            var scdb = await context.SubmissionContests.FirstOrDefaultAsync(p => p.UId.Equals(sc.UId));
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

        public async Task<SubmissionContest> GetSCById(int id)
        {
            var sc = await context.SubmissionContests.FindAsync(id);
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
