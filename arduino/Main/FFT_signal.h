#define FFT_N 32 // Must be a power of 2
#define TOTAL_TIME 9.391904 //The time in which data was captured. This is equal to FFT_N/sampling_freq


float fft_input[FFT_N];
float fft_output[FFT_N];

float max_magnitude = 0;
float fundamental_freq = 0;


/* Dummy data (Output of an accelerometer)
 * Frequency: 5 Hz
 * Amplitude: 0.25g
*/
double fft_signal[FFT_N] = {
11100,10600,11200,11700,12200,12900,12900,13100,11600,12900,13600,13000,12100,11700,11000,11500,10400,10800,9800,9800,9400,9700,8700,8700,8200,8200,7700,7800,7200,7200,6900,5900};
