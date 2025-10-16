function status(request, response) {
  response.status(200).json({ chave: "valor", another: "test" });
}

export default status;