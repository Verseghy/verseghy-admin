import { Component, Inject } from '@angular/core'
import { BaseModal, FileItem } from 'carbon-components-angular'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProblemService } from '../../services/problem.service'
import { Buffer } from 'buffer'

export enum ModalType {
  ModalTypeAdd = 'add',
  ModalTypeEdit = 'edit',
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent extends BaseModal {
  form = new FormGroup({
    body: new FormControl('', [Validators.required]),
    solution: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    image: new FormControl(new Set<FileItem>()),
  })
  loaded = false

  constructor(
    @Inject('type') public type: ModalType,
    @Inject('editID') private editID: string | undefined,
    private problemService: ProblemService
  ) {
    super()
    if (editID) {
      this.problemService.getByKey(editID).subscribe((data) => {
        this.loaded = true
        this.form.controls['body'].setValue(data.body)
        this.form.controls['solution'].setValue(data.solution)
        if (data.image) {
          this.form.controls['image'].setValue(
            new Set([
              {
                state: 'edit',
                uploaded: true,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                file: this.dataUrlToFile(data.image, 'uploaded')!,
              },
            ])
          )
        }
      })
    } else {
      this.loaded = true
    }
  }

  private dataUrlToFile(
    dataUrl: string | undefined,
    filename: string
  ): File | undefined {
    if (!dataUrl) return undefined
    const arr = dataUrl.split(',')
    if (arr.length < 2) {
      return undefined
    }
    const mimeArr = arr[0].match(/:(.*?);/)
    if (!mimeArr || mimeArr.length < 2) {
      return undefined
    }
    const mime = mimeArr[1]
    const buff = Buffer.from(arr[1], 'base64')
    return new File([buff], filename, { type: mime })
  }

  private async fileToDataUrl(file: File | null): Promise<string | null> {
    if (!file) return null
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async submit() {
    const req = {
      id: this.editID ?? undefined,
      body: this.form.controls['body'].value ?? undefined,
      solution: this.form.controls['solution'].value ?? undefined,
      image:
        (await this.fileToDataUrl(
          Array.from(this.form.controls['image'].value ?? [])[0]?.file
        )) ?? undefined,
    }
    switch (this.type) {
      case ModalType.ModalTypeAdd:
        this.problemService
          .add(req, { isOptimistic: false })
          .subscribe({ next: () => this.closeModal(), error: console.log })
        break
      case ModalType.ModalTypeEdit:
        this.problemService
          .update(req, { isOptimistic: false })
          .subscribe({ next: () => this.closeModal(), error: console.log })
        break
    }
  }
}
