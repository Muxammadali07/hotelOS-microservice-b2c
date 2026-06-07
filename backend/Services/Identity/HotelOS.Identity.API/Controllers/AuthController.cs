using Velora.Identity.API.DTOs;
using Velora.Identity.API.Services;
using Velora.Identity.Core.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Velora.Identity.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IIdentityService _identityService;
    private readonly JwtTokenService  _jwtService;
    private readonly IConfiguration   _config;

    public AuthController(
        IIdentityService identityService,
        JwtTokenService  jwtService,
        IConfiguration   config)
    {
        _identityService = identityService;
        _jwtService      = jwtService;
        _config          = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var account = await _identityService.LoginAsync(
                request.Email, request.Password);

            var token      = _jwtService.GenerateToken(account);
            var expMinutes = int.Parse(_config["Jwt:ExpiryMinutes"] ?? "60");

            return Ok(new LoginResponse(
                Id:        account.Id,
                Email:     account.Email,
                Role:      account.Role.ToString(),
                Token:     token,
                ExpiresAt: DateTime.UtcNow.AddMinutes(expMinutes)));
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
}