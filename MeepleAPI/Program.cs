using MeepleAPI.Mappings;
using MeepleAPI.Repositories;
using AutoMapper; // AutoMapper namespace
using Amazon.DynamoDBv2;

var builder = WebApplication.CreateBuilder(args);

// Add AWS DynamoDB client with credentials from appsettings.json
builder.Services.AddSingleton<IAmazonDynamoDB>(sp =>
{
    var awsOptions = builder.Configuration.GetSection("AWS");
    var awsAccessKey = awsOptions["AccessKey"];
    var awsSecretKey = awsOptions["SecretKey"];
    var region = awsOptions["Region"];

    // Debugging output to confirm credentials and region
    Console.WriteLine($"AWS Access Key: {awsAccessKey}");
    Console.WriteLine($"AWS Region: {region}");

    if (string.IsNullOrWhiteSpace(region))
    {
        throw new ArgumentException("AWS Region is not configured properly.");
    }

    var config = new AmazonDynamoDBConfig
    {
        RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region) // Validate region
    };

    return new AmazonDynamoDBClient(awsAccessKey, awsSecretKey, config);
});

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IGamesRepository, GamesRepository>();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<ICollectionsRepository, CollectionsRepository>();

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS middleware
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
