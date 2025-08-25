<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user(); // authenticated user via Sanctum

        // validate request data
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string'],
            'new_password' => ['nullable', 'string', 'min:8'],
        ]);

        // update fields
        $user->name = $validated['name'];
        $user->email = $validated['email'];

        // handle password change
        if (!empty($validated['password']) && !empty($validated['new_password'])) {
            if (!Hash::check($validated['password'], $user->password)) {
                return response()->json([
                    'message' => 'Current password is incorrect'
                ]);
            }

            $user->password = Hash::make($validated['new_password']);
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }
}
