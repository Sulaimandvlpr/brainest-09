import { exp, log, pow } from 'mathjs';

// 3PL probability
export function irt3plProbability(theta, a, b, c) {
  return c + (1 - c) / (1 + exp(-a * (theta - b)));
}

// Log-likelihood for MLE
export function logLikelihood(theta, responses, items) {
  let ll = 0;
  for (const resp of responses) {
    const q = items.find(q => q.id === resp.question_id);
    const { a, b, c } = q.irt_parameters;
    const p = irt3plProbability(theta, a, b, c);
    ll += resp.is_correct ? log(p + 1e-9) : log(1 - p + 1e-9);
  }
  return -ll;
}

// Simple MLE theta estimation (grid search for demo)
export function estimateTheta(responses, items) {
  let bestTheta = 0, bestLL = Infinity;
  for (let t = -4; t <= 4; t += 0.05) {
    const ll = logLikelihood(t, responses, items);
    if (ll < bestLL) {
      bestLL = ll;
      bestTheta = t;
    }
  }
  return bestTheta;
}

// Item Information Function (IIF) for 3PL
export function itemInformation(theta, a, b, c) {
  const p = irt3plProbability(theta, a, b, c);
  return pow(a, 2) * pow((1 - c), 2) * (p - c) / (pow(1 - p, 2) * (1 - c));
} 