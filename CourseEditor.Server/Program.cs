using CourseEditor.Application;
using CourseEditor.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IElementRepository, ElementRepository>();
builder.Services.AddScoped<ElementService>();


// Add controllers
builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

var app = builder.Build();

// Serve static files for SPA
app.UseStaticFiles();

// Enable routing
app.UseRouting();

// Map API controllers BEFORE SPA fallback
app.MapControllers();
 
app.MapFallbackToFile("index.html");    
app.Run();