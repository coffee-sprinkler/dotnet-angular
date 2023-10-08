using System.Text.Json.Serialization;

namespace backend.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TagsClass
    {
        Ordinary = 1,
        Work = 2,
        Personal = 3,
        Home = 4,
        Urgent = 5,
        Important = 6
    }
}