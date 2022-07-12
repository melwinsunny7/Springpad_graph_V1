import { BigInt } from "@graphprotocol/graph-ts"
import { FundTransferredToRWAO } from "../generated/Send/Send"
import { RepaymentDone } from "../generated/Receive/Receive"
import { Loan, Repayment } from "../generated/schema"

export function handleFundTransferredToRWAO(event: FundTransferredToRWAO): void {
  let id = event.params.loanId
  let entity = Loan.load(id)

  if (!entity) {
    entity = new Loan(id)
    entity.id = event.params.loanId
  }
  entity.LoanId = event.params.loanId
  entity.AssetId = event.params.assetId
  entity.NFTId = event.params.LNFTId
  entity.rwaoId = event.params.rwaoId
  entity.RepaymentDate = event.params.repaymentDate
  entity.Tenure = event.params.tenure
  entity.FundingStatus = event.params.fundingStatus

  entity.save() 
}

export function handleRepaymentDone(event: RepaymentDone): void {
  let id = event.params.loanId
  let entity = Repayment.load(id)

  if (!entity) {
    entity = new Repayment(id)
    entity.id = event.params.loanId
  }
  entity.LoanId = event.params.loanId
  entity.RepaymentStatus = event.params.repaymentStatus
  entity.fromAddress = event.params.from

  entity.save()

}