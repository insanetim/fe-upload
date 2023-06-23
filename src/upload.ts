interface IOptions {
  multi: boolean
  accept?: string[]
  onUpload?(files: File[], blocks: NodeListOf<HTMLElement>): void
}

function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

const element = <T extends HTMLElement>(tag: string, classes: string[] = [], content?: string): T => {
  const node = document.createElement(tag) as T

  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.textContent = content
  }

  return node
}

function noop() {}

export function upload(selector: string, options: IOptions) {
  let files: File[] = []
  const onUpload = options.onUpload ?? noop
  const input = document.querySelector(selector) as HTMLInputElement
  const preview = element<HTMLDivElement>('div', ['preview'])
  const open = element<HTMLButtonElement>('button', ['btn'], 'Открыть')
  const upload = element<HTMLButtonElement>('button', ['btn', 'primary'], 'Загрузить')
  upload.style.display = 'none'

  if (options.multi) {
    input.setAttribute('multiple', 'true')
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  input.insertAdjacentElement('afterend', preview)
  input.insertAdjacentElement('afterend', upload)
  input.insertAdjacentElement('afterend', open)

  const triggerInput = () => input.click()

  const changeHandler = (event: Event) => {
    if (!(event.target as HTMLInputElement).files || !(event.target as HTMLInputElement).files?.length) {
      return
    }

    files = Array.from((event.target as HTMLInputElement).files!)
    preview.innerHTML = ''
    upload.style.display = 'inline'

    files.forEach(file => {
      if (!file.type.match('image')) {
        return
      }

      const reader = new FileReader()

      reader.onload = ev => {
        preview.insertAdjacentHTML(
          'afterbegin',
          `
          <div class="preview-image">
            <div class="preview-remove" data-name="${file.name}">&times;</div>
            <img src="${ev.target?.result}" alt="${file.name}" />
            <div class="preview-info">
              <span>${file.name}</span>
              ${bytesToSize(file.size)}
            </div>
          </div>
        `
        )
      }

      reader.readAsDataURL(file)
    })
  }

  const removeHandler = (event: Event) => {
    if (!(event.target as HTMLDivElement).dataset.name) {
      return
    }

    const name = (event.target as HTMLDivElement).dataset.name!
    files = files.filter(file => file.name !== name)

    if (!files.length) {
      upload.style.display = 'none'
    }

    const block = preview.querySelector(`[data-name="${name}"]`)?.parentElement
    block?.classList.add('removing')
    setTimeout(() => block?.remove(), 300)
  }

  const clearPreview = (el: HTMLElement) => {
    el.style.bottom = '0px'
    el.innerHTML = '<div class="preview-info-progress"></div>'
  }

  const uploadHandler = () => {
    preview.querySelectorAll('.preview-remove').forEach(e => e.remove())
    const previewInfo = preview.querySelectorAll<HTMLElement>('.preview-info')
    previewInfo.forEach(clearPreview)
    onUpload(files, previewInfo)
  }

  open.addEventListener('click', triggerInput)
  input.addEventListener('change', changeHandler)
  preview.addEventListener('click', removeHandler)
  upload.addEventListener('click', uploadHandler)
}
