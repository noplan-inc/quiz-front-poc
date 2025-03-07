import type { AudioQuizProps, ImageQuizProps, VideoQuizProps } from "@/types/quiz";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuizItem } from "../QuizItem";

describe("メディア付き問題コンポーネント", () => {
  // 共通のプロパティ
  const baseProps = {
    id: "test-media",
    question: "メディアを含む問題です",
    choices: [
      { id: "a", text: "選択肢A", isCorrect: true },
      { id: "b", text: "選択肢B", isCorrect: false },
    ],
    onAnswer: vi.fn(),
  };

  describe("ImageQuiz", () => {
    const imageQuizProps: ImageQuizProps = {
      ...baseProps,
      type: "image",
      imageUrl: "https://example.com/test.jpg",
      imageAlt: "テスト画像",
    };

    it("画像付き問題が正しく表示される", () => {
      render(<QuizItem {...imageQuizProps} />);

      // 問題文が表示されていることを確認
      expect(screen.getByTestId("question-text")).toHaveTextContent("メディアを含む問題です");

      // 画像が表示されていることを確認
      const image = screen.getByTestId("question-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://example.com/test.jpg");
      expect(image).toHaveAttribute("alt", "テスト画像");

      // 選択肢が表示されていることを確認
      expect(screen.getByTestId("choice-a")).toHaveTextContent("選択肢A");
      expect(screen.getByTestId("choice-b")).toHaveTextContent("選択肢B");
    });
  });

  describe("VideoQuiz", () => {
    const videoQuizProps: VideoQuizProps = {
      ...baseProps,
      type: "video",
      videoUrl: "https://example.com/test.mp4",
      poster: "https://example.com/poster.jpg",
    };

    it("動画付き問題が正しく表示される", () => {
      render(<QuizItem {...videoQuizProps} />);

      // 問題文が表示されていることを確認
      expect(screen.getByTestId("question-text")).toHaveTextContent("メディアを含む問題です");

      // 動画が表示されていることを確認
      const video = screen.getByTestId("question-video");
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute("src", "https://example.com/test.mp4");
      expect(video).toHaveAttribute("poster", "https://example.com/poster.jpg");
      expect(video).toHaveAttribute("controls");

      // 選択肢が表示されていることを確認
      expect(screen.getByTestId("choice-a")).toHaveTextContent("選択肢A");
      expect(screen.getByTestId("choice-b")).toHaveTextContent("選択肢B");
    });
  });

  describe("AudioQuiz", () => {
    const audioQuizProps: AudioQuizProps = {
      ...baseProps,
      type: "audio",
      audioUrl: "https://example.com/test.mp3",
    };

    it("音声付き問題が正しく表示される", () => {
      render(<QuizItem {...audioQuizProps} />);

      // 問題文が表示されていることを確認
      expect(screen.getByTestId("question-text")).toHaveTextContent("メディアを含む問題です");

      // 音声が表示されていることを確認
      const audio = screen.getByTestId("question-audio");
      expect(audio).toBeInTheDocument();
      expect(audio).toHaveAttribute("src", "https://example.com/test.mp3");
      expect(audio).toHaveAttribute("controls");

      // 選択肢が表示されていることを確認
      expect(screen.getByTestId("choice-a")).toHaveTextContent("選択肢A");
      expect(screen.getByTestId("choice-b")).toHaveTextContent("選択肢B");
    });
  });
});
