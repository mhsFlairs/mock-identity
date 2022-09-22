using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

const string authenticationScheme = "Bearer";

const string apiClaim = "OnlyAllowTokensIssueToThisApi";

// Checks if the API Name (AimyAuth) is one of the claims in the jwt token to make sure the token was issued to this Api only
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(apiClaim, policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("scope", "AimyAuth");
    });
});

// Adds the JWT berarer authenticaiton
builder.Services.AddAuthentication(authenticationScheme).AddJwtBearer(authenticationScheme, opt =>
{
    // Configures the authority to the url of the identity server
    opt.Authority = builder.Configuration.GetSection("Identity")["Authority"];

    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false
    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


//TestingOnly: Allows cross origin access to allow the react client 
app.UseCors(p =>
{
    p.AllowAnyOrigin();
    p.AllowAnyHeader();
    p.AllowAnyMethod();
});

//TestingOnly: Adds authorization to all the requests 
app.MapControllers().RequireAuthorization(apiClaim);

app.Run();
