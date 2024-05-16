#!/usr/bin/python3
""" Prime Game Problem
    Topic: Eratosthenes algorithm
"""


def isWinner(x, nums):
    """
    Determines the winner in the prime game using
    Eratosthenes prime sieving algorithm
    """
    ben_wins = 0
    maria_wins = 0

    for round_num in range(x):
        playing_numbers = list(range(2, nums[round_num] + 1))
        index = 0
        while index < len(playing_numbers):
            current_prime = playing_numbers[index]
            sieve_index = index + current_prime
            while sieve_index < len(playing_numbers):
                playing_numbers.pop(sieve_index)
                sieve_index += current_prime - 1
            index += 1

        prime_count = len(playing_numbers)
        if prime_count and prime_count % 2:
            maria_wins += 1
        else:
            ben_wins += 1

    if ben_wins == maria_wins:
        return None
    return 'Ben' if ben_wins > maria_wins else 'Maria'
