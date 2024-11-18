using AutoMapper; // AutoMapper namespace
using MeepleAPI.DTOs; // Namespace for your DTOs
using MeepleAPI.Models; // Namespace for your Models

namespace MeepleAPI.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Define mappings
            CreateMap<Game, GameDTO>();
            CreateMap<GameDTO, Game>();
        }
    }
}