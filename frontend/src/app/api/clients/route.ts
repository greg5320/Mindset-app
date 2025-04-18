import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {

    const body = await request.json()

    const { first_name, last_name, patronymic, phone_number } = body

    if (!first_name || !last_name || !patronymic || !phone_number) {
      return NextResponse.json({ error: "Все поля обязательны для заполнения" }, { status: 400 })
    }

    console.log("Получены данные клиента:", {
      first_name,
      last_name,
      patronymic,
      phone_number,
    })


    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена",
    })
  } catch (error) {
    console.error("Ошибка при обработке заявки:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

