using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Repository
{
	public class CountryImp : ICountry
	{
		private readonly ProjectS3Context _dbContext;
		public CountryImp(ProjectS3Context dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<Country> AddCountryAsync(Country country)
		{
			if (country != null)
			{
				await _dbContext.Countries.AddAsync(country);
				await _dbContext.SaveChangesAsync();
				return country;
			}
			else
			{
				return null;
			}
		}

		public async Task<bool> DeleteCountryAsync(int countryId)
		{
			var countryDb = await _dbContext.Countries.FindAsync(countryId);
			if (countryDb != null)
			{
				_dbContext.Countries.Remove(countryDb);
				await _dbContext.SaveChangesAsync();
				return true;
			}
			else
			{
				return false;
			}

		}

		public async Task<IEnumerable<Country>> GetCountriesAsync()
		{
			return await _dbContext.Countries.ToListAsync();
		}

		public async Task<Country> GetCountryAsync(int countryId)
		{
			var countryDb = await _dbContext.Countries.FindAsync(countryId);
			return (countryDb != null) ? countryDb : null;
		}

		public async Task<Country> UpdateCountryAsync(Country country)
		{
			var countryDb = await _dbContext.Countries.FindAsync(country.CountryId);
			if (countryDb != null)
			{
				_dbContext.Entry(countryDb).State = EntityState.Modified;
				await _dbContext.SaveChangesAsync();
				return countryDb;
			}
			else
			{
				return null;
			}
		}
	}
}
