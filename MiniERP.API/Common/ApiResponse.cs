namespace MiniERP.API.Common;

public class ApiResponse<T>
{
    public bool Succeeded { get; init; }
    public T? Data { get; init; }
    public string? Message { get; init; }
    public IEnumerable<string> Errors { get; init; } = [];

    public static ApiResponse<T> Success(T data, string? message = null) =>
        new() { Succeeded = true, Data = data, Message = message };

    public static ApiResponse<T> Failure(string error) =>
        new() { Succeeded = false, Errors = [error] };

    public static ApiResponse<T> Failure(IEnumerable<string> errors) =>
        new() { Succeeded = false, Errors = errors };
}
