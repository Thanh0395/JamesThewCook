using System.Security.Cryptography;
using System.Text;

namespace JamesThewAPI.ModelUtility
{
    public class UserSecurity
    {
        private static string key = "IWantToBeWhoVeryBest";
        public static string EncodePlanTet(string originPassword)
        {
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);
            byte[] stringBytes = Encoding.UTF8.GetBytes(originPassword);
            using (var hmac = new HMACSHA256(keyBytes))
            {
                //bam stringBytes cua pass thanh mang bytes
                byte[] hashBytes = hmac.ComputeHash(stringBytes);
                //Convert stringBytes cua pass trc khi  bam
                //Convert hashBytes cua pass sau khi  bam
                string encodeString = Convert.ToBase64String(stringBytes) + "." + Convert.ToBase64String(hashBytes);
                return encodeString;
            }
        }

        public static string DecodePlanTet(string encodeString)
        {
            string[] parts = encodeString.Split(".");
            if (parts.Length != 2)
            {
                throw new Exception("Invalid encoding string format");
            }
            byte[] decodingStringBytes = Convert.FromBase64String(parts[0]);
            byte[] decodingHashBytes = Convert.FromBase64String(parts[1]);
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);
            using (var hmac = new HMACSHA256(keyBytes))
            {
                //mang byte[] decodingStringBytes chua bam thi bam
                // de kiem tra voi chuoi decodingHasBytes (da bam)
                bool hashMatch = hmac.ComputeHash(decodingStringBytes).SequenceEqual(decodingHashBytes);
                if (!hashMatch)
                {
                    throw new Exception("Hash does not match string");
                }
                string decodedString = Encoding.UTF8.GetString(decodingStringBytes);
                return decodedString;
            }
        }
    }
}
