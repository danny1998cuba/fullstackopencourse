import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog component", () => {
  let mockHandlerLike;
  const blog = {
    id: "321adf",
    title: "First Blog",
    author: "Author 1",
    url: "http://example.com/1",
    likes: 5,
    user: {
      name: "Daniel",
      username: "danny98",
      id: "321ade",
    },
  };

  beforeEach(() => {
    mockHandlerLike = vi.fn();
    render(
      <Blog
        blog={blog}
        handleDeleteProps={() => {}}
        user={{}}
        handleLikeProps={mockHandlerLike}
      />
    );
  });

  test("renders title and author but not url or likes", () => {
    const text = screen.getByTestId("test-text-section");
    expect(text).toHaveTextContent(`${blog.title} ${blog.author}`);

    expect(screen.queryByTestId("test-url-section")).not.toBeInTheDocument();
    expect(screen.queryByTestId("test-likes-section")).not.toBeInTheDocument();
  });

  test("renders url and likes when view button is pressed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    screen.getByTestId("test-url-section");
    screen.getByTestId("test-likes-section");
  });

  test("like button is pressed twice generates two calls", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandlerLike.mock.calls).toHaveLength(2);
  });
});
