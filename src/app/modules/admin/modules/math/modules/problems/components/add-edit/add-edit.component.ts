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

  constructor(
    @Inject('type') public type: ModalType,
    @Inject('editID') private editID: string | undefined,
    private problemService: ProblemService
  ) {
    super()
    if (editID) {
      this.problemService.getByKey(editID).subscribe(
        (data) => {
          this.form.controls['body'].setValue(data.body)
          this.form.controls['solution'].setValue(data.solution)
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
        },
        console.log,
        () => {console.log('finished')}
      )
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
      body: this.form.controls['body'].value ?? undefined,
      solution: this.form.controls['solution'].value ?? undefined,
      image:
        (await this.fileToDataUrl(
          Array.from(this.form.controls['image'].value ?? [])[0]?.file
        )) ?? undefined,
    }
    this.problemService.add(req, { isOptimistic: false })
  }
}
