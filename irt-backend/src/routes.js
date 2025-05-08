import express from 'express';
import { questions, attempts } from './db.js';
import { estimateTheta, itemInformation } from './irt.js';

const router = express.Router();

router.post('/tryout/answer', async (req, res) => {
  const { user_id, tryout_id, question_id, chosen_option, theta_before } = req.body;
  const q = await questions.findOne({ id: question_id });
  const is_correct = chosen_option === q.correct_option;
  const prev = await attempts.findOne({ user_id, tryout_id }) || { responses: [] };
  const responses = [
    ...prev.responses,
    { question_id, chosen_option, is_correct, theta_before, theta_after: theta_before }
  ];
  const allQuestions = await questions.find({ id: { $in: responses.map(r => r.question_id) } }).toArray();
  const theta_after = estimateTheta(responses, allQuestions);
  responses[responses.length - 1].theta_after = theta_after;
  await attempts.updateOne(
    { user_id, tryout_id },
    { $set: { responses, final_theta: theta_after } },
    { upsert: true }
  );

  // Pilih soal berikutnya adaptif (IIF maksimum pada theta_after)
  const answeredIds = responses.map(r => r.question_id);
  const remainingQuestions = await questions.find({ id: { $nin: answeredIds } }).toArray();
  let next_question = null;
  if (remainingQuestions.length > 0) {
    next_question = remainingQuestions.reduce((best, curr) => {
      const info = itemInformation(theta_after, curr.irt_parameters.a, curr.irt_parameters.b, curr.irt_parameters.c);
      if (!best || info > best.info) {
        return { ...curr, info };
      }
      return best;
    }, null);
    if (next_question) delete next_question.info;
  }

  res.json({
    is_correct,
    theta_after,
    next_question,
  });
});

export default router; 