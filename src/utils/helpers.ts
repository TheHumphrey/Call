import { addHours, format } from "date-fns";

// -------- MASKS
export const onlyNumberMask = (value: any) => {
  let calc: any = Math.round(value * 100) / 100
  calc = `${calc}`
  return calc.replace(/\D/g, "")
}

export const categoryTranslateMask = (value: string) => {
  switch (value) {
    case 'fixed-cost':
      return 'Custo fixo'
    case 'variable-costs':
      return 'Custo variável'
    case 'investments':
      return 'Investimento'
    default:
      return 'Transação não operacional'
  }
}

export const nameMask = (value: any) => {
  if (value === "" || value === undefined) return "";
  else {
    return value
      .replace(/[^a-záàâãéèêíïóôõöúçñ ]+$/i, "") // aceita somente letras e caracteres acentuados
      .replace(/^.{120}$/, "") // max-length 120
  }
};

export const maskTuss = (value: any) => {
  if (value === "" || value === undefined) return "";
  else {
    return value
      .replace(/\D/g, "")
      .replace(/^.{11}$/, "")
  }
}

//TODO: reduzir as duas funções abaixo em apenas uma (max-length via props)
export const descriptionMask = (value: any) => {
  if (value === "" || value === undefined) return "";
  else {
    return value.replace(/^.{400}$/, "")
  }
}

export const termMask = (value: any) => {
  if (value === "" || value === undefined) return "";
  else {
    return value.replace(/^.{40}$/, "")
  }
}

export const cpfMask = (value: any) => {
  if (value === "" || value === undefined) return "";
  else {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
};

export const cpfMaskToSend = (value: any) => {
  if (value === "" || value === undefined) return "";
  else {
    return value.replace(/[.-]/g, "");
  }
};

export function hourFormat(hour: any) {
  if (hour?.length > 2) {
    var string = hour;
    var metade = Math.floor(string.length / 2);
    return string.substr(0, metade) + ":" + string.substr(metade);
  }
}

export const cepMask = (value: any) => {
  if (value === "" || value === undefined) return "";
  else {
    try {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
    } catch {
      return "";
    }
  }
};

export const hourMask = (value: any) => {
  if (value) return "";
  else {
    if (value.length > 2) {
      //TODO: ????????
    };
  }
};

export function formatDate(date: any) {
  if (date) {
    const newDate = format(addHours(new Date(date), 3), "dd/MM/yyyy");
    return newDate;
  }
}

export function formatDateYearless(date: any) {
  if (date) {
    const newDate = format(addHours(new Date(date), 3), "dd/MM");
    return newDate;
  }
}

export function birthDate(date: any) {
  if (date) {
    const newDate = format(new Date(date), "dd/MM/yyyy");
    return newDate;
  }
}

export function formatDateAndHours(date: any) {
  if (date) {
    const newDate = format(addHours(new Date(date), 3), "dd/MM/yyyy - HH:mm");
    return newDate;
  }
}
export function formatHours(date: any) {
  if (date) {
    const newDate = format(addHours(new Date(date), 3), "HH:mm");
    return newDate;
  }
}

export function dataMask(data: any) {
  if (!data) return "";
  const stringData = data.toString();
  return stringData
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
}

export function formatDateToSend(date: any) {
  const splited = date.split("/");
  const format = splited[2] + "-" + splited[1] + "-" + splited[0];
  return format;
}

export function moneyMask(money: any) {
  if (!money) return "";
  return money
    .toString()
    .replace(/\D/g, "") // permite digitar apenas numero
    .replace(/(\d{1})(\d{14})$/, "$1.$2") // coloca ponto antes dos ultimos 14 digitos
    .replace(/(\d{1})(\d{11})$/, "$1.$2") // coloca ponto antes dos ultimos 11 digitos
    .replace(/(\d{1})(\d{8})$/, "$1.$2") // coloca ponto antes dos ultimos 8 digitos
    .replace(/(\d{1})(\d{5})$/, "$1.$2") // coloca ponto antes dos ultimos 5 digitos
    .replace(/(\d{1})(\d{1,2})$/, "$1,$2"); // coloca virgula antes dos ultimos 2 digitos
}

export function moneyApi(money: any) {
  if (!money) return "";
  try {
    let moneyFormatted = money.toString().replace(".", ",").replace(/[,]/g, "");
    return moneyFormatted;
  } catch (error: any) {
    return money;
  }
}

export const cnpjMask = (value: any) => {
  if (!value) return "";
  const stringCnpj = value.toString();
  return stringCnpj
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const rgMask = (value: any) => {
  if (!value) return "";
  const stringRg = value.toString();
  return stringRg
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{1})\d+?$/, "$1");
};

export const phoneMask = (value: any, type?: any) => {
  if (value)
    return value
      .toString()
      .replace(/^.{15}$/)
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1)$2")
      .replace(/(\d{5})(\d)/, "$1-$2");
};

export const phoneNumberToSend = (value: any, type?: any) => {
  if (value) return value.replace(/[()-]/g, "");
};

export const numberMask = (value: any) => {
  return value;
};

export const textMask = (value: any) => {
  const a = parseInt(value);
  if (!isNaN(a)) {
    return "";
  } else {
    return value;
  }
};

export const getCurrentAge = (date: string) => {
  const dateNow = new Date()

  const userDay = parseInt(date.split('/')[0])
  const userMonth = parseInt(date.split('/')[1])
  const userYear = parseInt(date.split('/')[2])

  const todayMonth = dateNow.getMonth() + 1
  const today = dateNow.getDate()

  let currentAge = dateNow.getFullYear() - userYear

  if (todayMonth < userMonth || (todayMonth === userMonth && today < userDay)) currentAge--

  return currentAge
}
