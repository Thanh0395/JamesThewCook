using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
	public interface ICountry
	{
		Task<IEnumerable<Country>> GetCountriesAsync();
		Task<Country> GetCountryAsync(int countryId);
		Task<Country> AddCountryAsync(Country country);
		Task<Country> UpdateCountryAsync(Country country);
		Task<bool> DeleteCountryAsync(int countryId);
	}
}
